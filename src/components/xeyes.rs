use leptos::prelude::*;
use leptos::{
    wasm_bindgen::{closure::Closure, JsCast},
    web_sys,
};

#[component]
pub fn Xeyes() -> impl IntoView {
    let mouse_x = RwSignal::new(0.5);
    let mouse_y = RwSignal::new(0.5);

    fn pupil_offset(cx: f64, cy: f64, mx: f64, my: f64, max_offset: f64) -> (f64, f64) {
        let dx = mx - cx;
        let dy = my - cy;
        let dist = (dx * dx + dy * dy).sqrt().max(1.0);
        let scale = max_offset / dist.min(max_offset * 3.0);
        (cx + dx * scale, cy + dy * scale)
    }

    // substitui o antigo `on_mount` ou `create_effect`
    Effect::new(move |_| {
        let closure = Closure::wrap(Box::new(move |ev: web_sys::MouseEvent| {
            let w = web_sys::window()
                .unwrap()
                .inner_width()
                .unwrap()
                .as_f64()
                .unwrap_or(1.0);
            let h = web_sys::window()
                .unwrap()
                .inner_height()
                .unwrap()
                .as_f64()
                .unwrap_or(1.0);
            mouse_x.set(ev.client_x() as f64 / w);
            mouse_y.set(ev.client_y() as f64 / h);
        }) as Box<dyn FnMut(_)>);

        web_sys::window()
            .unwrap()
            .add_event_listener_with_callback("mousemove", closure.as_ref().unchecked_ref())
            .unwrap();

        closure.forget();
    });

    let view_box = "0 0 112 64";
    let eye_r = 14.0;
    let pupil_r = 5.0;
    let eye_l = (32.0, 32.0);
    let eye_r_pos = (80.0, 32.0);

    let left_pupil = move || {
        pupil_offset(
            eye_l.0,
            eye_l.1,
            mouse_x.get() * 112.0,
            mouse_y.get() * 64.0,
            eye_r - pupil_r,
        )
    };

    let right_pupil = move || {
        pupil_offset(
            eye_r_pos.0,
            eye_r_pos.1,
            mouse_x.get() * 112.0,
            mouse_y.get() * 64.0,
            eye_r - pupil_r,
        )
    };

    view! {
        <div class="fixed ml-auto right-2 pointer-events-none">
            <svg
                viewBox=view_box
                width="112"
                height="64"
                class="text-black dark:text-white"
                style="image-rendering: pixelated; shape-rendering: crispEdges;"
            >
                <circle
                    cx=eye_l.0
                    cy=eye_l.1
                    r=eye_r
                    fill="black"
                    stroke="lime"
                    stroke-width="1"
                    stroke-dasharray="4 2"
                />
                <circle
                    cx=eye_r_pos.0
                    cy=eye_r_pos.1
                    r=eye_r
                    fill="black"
                    stroke="lime"
                    stroke-width="1"
                    stroke-dasharray="4 2"
                />

                <circle cx=move || left_pupil().0 cy=move || left_pupil().1 r=pupil_r fill="lime" />
                <circle
                    cx=move || right_pupil().0
                    cy=move || right_pupil().1
                    r=pupil_r
                    fill="lime"
                />
            </svg>
        </div>
    }
}
