# UI_MOCKUP_STANDARDS（UI Mockup 规范）

UI_MOCKUP_STANDARDS 回答的是 HOW TO DESIGN BEFORE UI CODE：Web / App / Game 涉及 user-visible UI / UX change 时，UI code 前必须怎样准备、保存和批准 mockup。

## Mandatory Requirements

- **适用范围**：Web、App、Game 等任何 user-visible UI / UX change 都必须 follow；纯 backend、data、test、refactor、pipeline 等没有 UI / interaction 变化的 task 不适用。
- **先读现有 UI**：先读取当前 UI、Design SSOT、existing screenshot / component / layout / navigation pattern；不能脱离现有风格凭空设计。
- **先 mockup 后 code**：在写任何 UI implementation code 前，必须先做 mockup；不能先写 code 再补 mockup，也不能只用文字 wireframe 代替。
- **Mockup 格式按产品类型**：网页（Web）和非游戏 App 用 HTML mockup；游戏用图片 mockup（Chat Image 模型生成）。为什么：HTML 能点、能按真实宽度看，更接近真实界面，AI 也能直接读和精确修改文字；游戏画面主要是美术、角色和特效，HTML 画不出真实效果。
- **HTML mockup 怎么做**：一个 flow 一个 `.html` 文件，双击就能在浏览器打开；按目标设备宽度画（手机 App 按 375px；网页按 1280px 以上，同时在 375px 看一次）；用产品现有的颜色、字体和组件；可以点击切换 screen / state 来演示 flow，但不接真实数据和后端；样式和脚本写在这个文件里，外部资源只用 Google Fonts。
- **图片 mockup（游戏）**：用 Chat Image 模型生成；一个 flow 一张完整图。
- **必须画清什么**：Mockup 必须覆盖当前 flow 的 screen/state、navigation、关键 components、位置排布和 information hierarchy。
- **先定这一屏放什么**：画 mockup 前，先写一句这一屏让用户做成哪 1 件事，再列 `这一屏放什么 | 帮用户做成什么`，一项一行；对不上那 1 件事的 item 不放。这张清单放在 mockup 文件最上面，Human 打开先看它。为什么：AI 不知道用户要做成什么时，会把能想到的 item 都放上去，结果放的不是 Human 想要的（2026-11-13 Human 提的问题）。
- **UI 文字表**：Mockup 里附一张 `UI 上的字 | 用户看了会以为是干什么用的 | 实际是干什么用的` 表，每个按钮、标题、提示、数字标签一行。第 2 列和第 3 列对不上的字要重写：用户一看就知道这个东西是干什么用的、点了会发生什么；不只写一个名字（例如只写 `Streak`），要写出它帮用户做什么；不用内部术语、code 名或功能代号。为什么：Human 常常看不懂 AI 写的 UI 文字是干什么用的，Human 看不懂，用户更看不懂（2026-11-13 Human 提的问题）。
- **Human 说放手做时**：Human 对某个 UI 明确说放手让 AI 做时，不用等 mockup 批准，可以直接写 UI code；但仍先做 `先定这一屏放什么` 和 `UI 文字表` 两步自查，交付时一起给 Human。Human 没说放手的 UI 照下面 `Human approval gate` 执行。
- **保存位置**：AI 新生成并用于 implementation / review 的 mockup 保存到 project-root `mockups/`；新文件名以 `YYYY-MM-DD-` 开头，已有 approved mockup 不机械改名。
- **Folder 结构**：`mockups/` 只保留少量稳定的 top-level folders，并按最高层 user-facing object / product area 分组；不得按 feature、subfeature、screen 或 state 新建 top-level folder；existing folder 能容纳就必须复用。
- **一个 flow 一份 mockup**：一个 bounded functional flow 用一份完整 mockup（HTML 一个文件，或游戏的一张图）；从产品打开后的第一个 user-visible screen 开始，按真实操作顺序画到 flow 完成；不能跳过中间 screen/state，也不能拆成多份让 Human 自己拼接。
- **一次一个 flow**：一次只推进一个 bounded flow；mockup → Human review → 按 feedback 修正 → Human approve → UI code，然后再进入下一个 flow。
- **保持现有风格**：默认 follow 当前已确认 UI style / Design SSOT；如果 task 要改变 visual direction，mockup 必须明确展示变化。
- **Human approval gate**：Human 明确批准当前 flow 的完整 mockup 后，才允许写对应 UI code。
- **Codex Chat 内先展示审批图**：当 Codex 在某个 Codex Chat 请求 Human 批准 UI、mockup 或截图的可见内容方案时，必须先在**提出该批准请求的同一个 Codex Chat 内 inline 显示对应目标产品和当前方案的图片**（HTML mockup 先在浏览器里截图，同时给出 `.html` 文件路径），然后才请求批准。清楚标注证据等级：实际运行截图（真实运行/capture evidence）、mockup（设计提案）或示意图（illustrative，非真实截图/非发布候选）；不得将一种等级冒充另一种，也不得以其他 App 的图代替目标 App。仅提供 GitHub/文件链接，或只在 Web Chat 展示，不算完成同一 Codex Chat 的展示要求；若该 Codex Chat 无法 inline 显示图片，必须先说明阻塞，不得要求 Human 在看不到图时盲批准。此项只约束视觉方案审批，不扩展到非视觉 approval。
- **复用 approved mockup**：同一 scope 已有仍有效且 Human 已批准的 mockup 时直接复用，不机械重新生成。

## Conditional Requirements

- **需要 click / tap / select / submit**：用 step number 标出顺序，并用 circle / highlight 圈出实际操作 target；标清 target 和操作后进入的 screen/state。
- **复杂交互**：把理解 flow 必需的前后 states 放在同一张 mockup 里。
- **改变 visual direction**：清楚展示和现有 UI 的差异；Human approval 仍然是 UI code 前的 gate。
