<?php

namespace Tests\Feature;

use App\Models\Score;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_top_ten_lists_the_best_scores_first(): void
    {
        foreach (range(1, 12) as $i) {
            Score::create(['nickname' => 'Player'.$i, 'score' => $i * 100, 'character' => 0]);
        }

        $response = $this->getJson('/scores');

        $response->assertOk()->assertJsonCount(10);
        $this->assertSame(1200, $response->json('0.score'));
        $this->assertSame('Player3', $response->json('9.nickname'));
    }

    public function test_a_score_can_be_saved(): void
    {
        $response = $this->postJson('/scores', ['nickname' => 'Ada', 'score' => 450, 'character' => 2]);

        $response->assertCreated()->assertJson(['improved' => true, 'score' => 450, 'rank' => 1]);
        $this->assertDatabaseHas('scores', ['nickname' => 'Ada', 'score' => 450, 'character' => 2]);
    }

    public function test_a_nickname_keeps_only_its_best_score(): void
    {
        Score::create(['nickname' => 'Ada', 'score' => 900, 'character' => 0]);

        $this->postJson('/scores', ['nickname' => 'Ada', 'score' => 300, 'character' => 1])
            ->assertOk()
            ->assertJson(['improved' => false, 'score' => 900]);

        $this->postJson('/scores', ['nickname' => 'Ada', 'score' => 1200, 'character' => 1])
            ->assertCreated()
            ->assertJson(['improved' => true, 'score' => 1200]);

        $this->assertDatabaseCount('scores', 1);
    }

    public function test_bad_input_is_rejected(): void
    {
        $this->postJson('/scores', ['nickname' => '<b>', 'score' => 100, 'character' => 0])
            ->assertJsonValidationErrors('nickname');

        $this->postJson('/scores', ['nickname' => 'Ada', 'score' => Score::MAX_SCORE + 1, 'character' => 0])
            ->assertJsonValidationErrors('score');

        $this->postJson('/scores', ['nickname' => 'Ada', 'score' => 100, 'character' => 9])
            ->assertJsonValidationErrors('character');
    }
}
