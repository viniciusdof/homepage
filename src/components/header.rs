use crate::components::xeyes::Xeyes;
use leptos::prelude::*;

#[component]
pub fn HeaderBar() -> impl IntoView {
    view! {
        <div class="flex flex-col sm:flex-row justify-between items-center gap-2 border-1 border-pink-400 border-dashed p-1.5 mb-10">
            <span class="font-bold">"[  VINICIUSDOF  ]"</span>
            <Xeyes />
        </div>
    }
}
