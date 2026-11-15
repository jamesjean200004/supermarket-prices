# APP_GAME_RULES.md

## Scenario-Based Mandatory

触发条件：新建或已有 APP / Game project 的任何 product / design / build / save / release 工作。入口见 `AGENTS.md` 的 `规则索引：什么任务读哪个文件`。

### APP / Game scenario rules

只有对应 scenario 触发时才适用；一旦触发就是 Mandatory：

| 条件 | 必须遵守 |
|---|---|
| Any APP / Game product language | Mockup、UI、UX copy、accessibility text 和 store metadata 默认使用 English；除非 Human 明确要求，否则不创建 Chinese product version；Human-facing Chat 仍按中文为主。 |
| New or existing Game save / identity / progression work | 使用 canonical `$apple-app-design-standards` Skill 的 `Game Seamless Restore` contract：不要求 in-game sign-in，自动建立 player profile，并在真实 cloud 条件满足时安全恢复卸载前进度；existing game 只在相关 persistence change 时渐进 adoption，不借此重写无关系统。 |
| New or existing APP / Game project | GitHub Repository 是 blocking first step：new project 在 design/build 前创建；existing project 未建 repo 时在下一次发现或恢复工作后立即 backfill；默认 private，先检查 owner、duplicate、history、remote、`.gitignore`、secrets 和 generated files；repo 未验证前不开始 product work。 |
| APP / Game proposal requires Human approval | Personal Project 默认仅新增或实质改变 UI/UX 的完整 mockup 需 Human 批准；按 canonical `$apple-app-design-standards` Skill 的 `Claude + Codex Dual Review Gate` 先对同一 Revision 独立审核（若项目已由 Human 明确授予该 UI 双审免再次人工批准的更具体例外，则从其 override）。PRD、技术方案、日常代码/修复/测试、既定 Pipeline 自动交付不因本行新增 Human approval。Mockup 批准后直接执行实现和验证，AI 间 review 不能代替仍适用的安全 gate。 |
| Same visual element appears more than once in an APP / Game | 使用 canonical `$apple-app-design-standards` Skill 的 `Repeated Element Visual Consistency` contract：复用 canonical component / asset / tokens，保持所有入口与 states 的 visual identity 一致；system accessibility / localization adaptation 从 canonical owner 派生；new variant / exception 记录原因并先获 Human approval。 |
| APP / Game task creates temporary artifacts | 使用 canonical `$apple-app-design-standards` Skill 的 `Temporary Artifact Cleanup` contract：临时产物最后一个 consumer 完成后 ASAP 清理；只自动删除当前 task 创建、用途结束、无剩余引用且可重建的 exact targets；重要或不明确文件保留为 `UNVERIFIED`。 |
