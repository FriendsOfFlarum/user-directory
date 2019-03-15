<?php
$url = app('Flarum\Http\UrlGenerator');
?>
<div class="container">
    <h2>{{ $translator->trans('flagrow-user-directory.forum.page.nav') }}</h2>

    <ul>
        @foreach ($apiDocument->data as $user)
            <li>
                {{ $user->attributes->username }}
            </li>
        @endforeach
    </ul>

    <a href="{{ $url->to('forum')->route('flagrow_user_directory') }}?page={{ $page + 1 }}">{{ $translator->trans('core.views.index.next_page_button') }} &raquo;</a>
</div>
