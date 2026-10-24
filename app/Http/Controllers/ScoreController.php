<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function index(): JsonResponse{
        return response()->json(Score::topTen());
    }
    public function store(Request $request): JsonResponse{
        $data = $request->validate([
            'nickname' => ['required', 'string', 'min:2', 'max:16', 'regex:/^[\pL\pN _.\-]+$/u'],
            'score' => ['required', 'integer', 'min:1', 'max:'.Score::MAX_SCORE],
            'character' => ['required', 'integer', 'between:0,4'], 
        ], [
            'nickname.regex' => 'Use only letters, numbers, spaces, dots, dashes and underscores.',
        ]);

        $nickname=preg_replace('/\s+/u', ' ', $data['nickname']);
        $entry=Score::firstOrNew(['nickname' => $nickname]);
        $improved=!$entry->exists || $data['score'] > $entry->score;

        if($improved){
            $entry->score=$data['score'];
            $entry->character=$data['character'];
            $entry->save();
        }

        return response()->json([
            'improved' => $improved,
            'score' => $entry->score,
            'rank' => $entry->rank(),
            'top' => Score::topTen(),
        ],$improved ? 201 : 200); //HTTP status codes
    }
}
