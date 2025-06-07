use crate::components::header::HeaderBar;
use crate::components::link::Link;
use crate::components::marquee::Marquee;
use crate::components::visitor::VisitorCounter;
use leptos::prelude::*;

#[component]
pub fn Home() -> impl IntoView {
    view! {
        <HeaderBar />
        <VisitorCounter />
        <Link />
        <Marquee />
    }
}
