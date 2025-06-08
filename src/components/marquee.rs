use leptos::prelude::*;
use rand::rng; // <- atualizado
use rand::seq::SliceRandom;
use std::sync::Arc;
use std::time::Duration;

#[derive(Copy, Clone, PartialEq)]
enum Mode {
    TypingLine,
    TypingClear,
    WaitingAfterClear,
    Clearing,
}

#[component]
pub fn Marquee() -> impl IntoView {
    let mut lines = vec![
        "ls /realidade -> NotFound",
        "yay -S sentido-da-vida",
        "echo 'Allons-y!' > universo.log",
        "cd ~/ilusoes",
        "rm -rf /expectativas",
        "whoami -> visitante_anônimo",
        "tail -f /var/log/mente",
        "cat /dev/verdade | grep sentido",
        "chmod +x esperança.sh",
        "ps aux | grep sanidade",
        "find / -name 'motivo_para_existir'",
        "ping -c 3 universo",
        "exit # já tentou?",
        "alias vida=':q!'",
        "top -n 1 -> só decepção",
        "git commit -m 'tentando de novo'",
        "mv ~/sonhos ~/backup/2012",
        "watch -n 1 'echo tentando...'",
        "man reality # página não encontrada",
        "scp ~/alma servidor:/dev/null",
    ];

    lines.shuffle(&mut rng()); // <- atualizado

    let lines = Arc::new(lines);

    let output_lines = RwSignal::new(vec![]);
    let current_line = RwSignal::new(String::new());
    let line_index = RwSignal::new(0);
    let char_index = RwSignal::new(0);
    let mode = RwSignal::new(Mode::TypingLine);
    let delay_ticks = RwSignal::new(0);

    let lines_clone = Arc::clone(&lines);

    Effect::new(move |_| {
        let lines = Arc::clone(&lines_clone);

        set_interval_with_handle(
            move || {
                match mode.get() {
                    Mode::TypingLine => {
                        let i = line_index.get();
                        let full = lines[i];
                        let pos = char_index.get();

                        let chars: Vec<char> = full.chars().collect();
                        if pos < chars.len() {
                            current_line
                                .set(format!("$ {}", chars[..=pos].iter().collect::<String>()));
                            char_index.update(|p| *p += 1);
                        } else {
                            output_lines.update(|out| {
                                out.push(format!("$ {}", full));
                                if out.len() >= 3 {
                                    mode.set(Mode::TypingClear);
                                    char_index.set(0);
                                } else {
                                    line_index.update(|i| *i = (*i + 1) % lines.len());
                                    char_index.set(0);
                                }
                            });
                            current_line.set(String::new());
                        }
                    }

                    Mode::TypingClear => {
                        let full = "clear";
                        let chars: Vec<char> = full.chars().collect();
                        let pos = char_index.get();

                        if pos < chars.len() {
                            current_line
                                .set(format!("$ {}", chars[..=pos].iter().collect::<String>()));
                            char_index.update(|p| *p += 1);
                        } else {
                            current_line.set("$ clear".to_string());
                            mode.set(Mode::WaitingAfterClear);
                            delay_ticks.set(10); // 0.5s
                        }
                    }

                    Mode::WaitingAfterClear => {
                        delay_ticks.update(|d| *d -= 1);
                        if delay_ticks.get() <= 0 {
                            mode.set(Mode::Clearing);
                        }
                    }

                    Mode::Clearing => {
                        output_lines.set(vec![]);
                        current_line.set(String::new());
                        char_index.set(0);
                        line_index.update(|i| *i = (*i + 1) % lines.len());
                        mode.set(Mode::TypingLine);
                    }
                }
            },
            Duration::from_millis(50),
        )
        .expect("interval failed");
    });

    view! {
        <pre class="whitespace-pre-wrap text-[12px] sm:text-[14px] h-[80px] sm:h-[100px] border-1 border-pink-400 border-dashed p-1.5 mt-2 flex flex-col justify-start overflow-hidden">
            <For
                each=move || output_lines.get()
                key=|line| line.clone()
                children=move |line| view! { <div>{line}</div> }
            />
            <div>{move || current_line.get()}</div>
        </pre>
    }
}
