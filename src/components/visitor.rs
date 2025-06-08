use leptos::prelude::*;

#[component]
pub fn VisitorCounter() -> impl IntoView {
    let count = rand::random::<u32>() % 10000 + 1;
    let formatted = format!("{count:>0}");
    let formatted = formatted
        .chars()
        .rev()
        .collect::<Vec<_>>()
        .chunks(3)
        .map(|chunk| chunk.iter().collect::<String>())
        .collect::<Vec<_>>()
        .join(".");
    let formatted = formatted.chars().rev().collect::<String>();

    view! {
        <pre class="mb-10 text-xs sm:text-sm">
            {format!("Visitantes: {} (QUE INCRIVEL!!!!!!!!!!!!!!!!)", formatted)}
        </pre>
    }
}
