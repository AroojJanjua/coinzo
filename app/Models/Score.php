<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    public const MAX_SCORE=99999;
    protected $fillable=[
        'nickname',
        'score',
        'character',
    ];

    protected function casts(): array{
        return[
            'score' => 'integer',
            'character' => 'integer',
        ];
    }

    public static function topTen(): Collection{
        return static::query()
            ->orderByDesc('score')
            ->orderBy('updated_at')
            ->orderBy('id')
            ->limit(10)
            ->get(['nickname', 'score', 'character']);
    }

    public function rank(): int{
        return static::where('score', '>', $this->score)->count() + 1;
    }
}
