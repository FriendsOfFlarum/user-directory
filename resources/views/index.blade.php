<?php
$url = app('Flarum\Forum\UrlGenerator');
?>
<div class="container">
    <h2>{{ $translator->trans('core.views.index.all_discussions_heading') }}</h2>

    <ul>
        @foreach ($document->data as $user)
            <li>
                {{ $user->attributes->username }}
            </li>
        @endforeach
    </ul>

    <a href="{{ $url->toRoute('flagrow_user_directory') }}?page={{ $page + 1 }}">{{ $translator->trans('core.views.index.next_page_button') }} &raquo;</a>
</div>
