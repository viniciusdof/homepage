use crate::components::xeyes::Xeyes;
use leptos::prelude::*;

//
#[component]
pub fn HeaderBar() -> impl IntoView {
    view! {
        <div class="flex space-between items-center border-1 border-pink-400 border-dashed p-1.5 mb-10">
            <span class="font-bold">"[  VINICIUSDOF  ]"</span>
            <Xeyes />
        </div>
    }
}
