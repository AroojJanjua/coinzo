<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="scores-url" content="{{ route('scores.index') }}">
<title>Coinzo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('css/coinzo.css') }}">
<script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script>
</head>
<body>
<main>
 <h1>Coinzo</h1>
 <p class="sub">
 Collect coins, and beat your best score. You get 45 seconds.
 </p>
 <div class="frame">
  <div id="boot" class="boot"><div class="spin"></div><span>Loading game...</span></div>
  <div id="game"></div>
 </div>
 <p class="keys"><kbd>&larr;</kbd><kbd>&uarr;</kbd><kbd>&darr;</kbd><kbd>&rarr;</kbd> 
 or <kbd>A</kbd><kbd>W</kbd><kbd>S</kbd><kbd>D</kbd> to move.</p>
</main>
<script src="{{ asset('js/coinzo.js') }}"></script>
</body>
</html>