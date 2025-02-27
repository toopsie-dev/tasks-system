<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Tasts System</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    @vite('resources/css/app.css')
    <style>
        * {
            user-select: none;
            font-family: "Exo 2", serif;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    @viteReactRefresh
    @vite('resources/js/app.ts')
</body>
    <script>
        window.env = {
            API_BASE_URL: '{{ env("API_BASE_URL") }}'
        }
    </script>
</html>