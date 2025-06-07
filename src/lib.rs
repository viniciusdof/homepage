mod components;
mod pages;
use leptos::IntoView;
use leptos::component;
use leptos::view;
use pages::home::Home;

#[component]
pub fn App() -> impl IntoView {
    view! {
       <Home />
    }
}
