use leptos::prelude::*;

#[component]
pub fn Link() -> impl IntoView {
    let links = vec![
        ("LAST.FM", "https://www.last.fm/user/viniciusdof"),
        ("LETTERBOXD", "https://letterboxd.com/viniciusdof/"),
        ("BLUESKY", "https://bsky.app/profile/viniciusdof.com"),
        ("GITHUB", "https://github.com/viniciusdof"),
        ("INSTAGRAM", "https://www.instagram.com/viniciusdof/"),
        ("DISCOGS", "https://www.discogs.com/user/viniciusdof"),
    ];

    view! {
        <pre>
            "=============== LINKS ==============="
            {links
                .into_iter()
                .map(|(name, url)| {
                    view! {
                        <>
                            {format!("\n{name:<12} -> ")}
                            <a href=url target="_blank" class="hover:underline">
                                {url}
                            </a>
                        </>
                    }
                })
                .collect_view()} "\n====================================="
        </pre>
    }
}
