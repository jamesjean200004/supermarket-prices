# COMMON_RULES_SYNC.md

## Scenario-Based Mandatory

触发条件：修改 Common canonical rules；新建 Repository；向 downstream repo 同步或安装 Common files；Codex 给网页 ChatGPT refresh 规则；Web Chat 修改 Knowledge Hub；Codex / Claude 修改 personal repo 内 team plain-copy files。每次开始新 task 都必须遵守的 fail-closed 一句话版在 `AGENTS.md` 的 `安全与审批门槛（一句话版）`。入口见 `AGENTS.md` 的 `规则索引：什么任务读哪个文件`。

### Latest canonical AGENTS freshness gate

这条 gate 适用于所有新项目、旧项目、继续中的旧 Chat 和 scheduled supervision；`latest canonical rules` 指 Common Repository 最新已验证 `main` 上的完整 Common block（`AGENTS.md`、`WEBCHAT_AGENTS.md` 以及 `prompts/common-prompts/rules/`、`standards/`、`review/`、`explain/`、`templates/` 下的共享文件，以及 `info-summary/assets/` 下的共用 CSS/JS），不是电脑里修改时间最晚的任意 `AGENTS.md`。

- **每次重新确认**：开始新 task、接收新的 user objective、恢复旧 Chat、发送 Web Chat follow-up 或恢复 scheduled supervision 前，都必须重新读取当前项目 scope 内所有 applicable `AGENTS.md`，并检查 Common canonical `AGENTS.md` / `WEBCHAT_AGENTS.md` 以及 AGENTS 规则索引列出的共享规则文件是否已更新；不能因为同一 Chat 之前读过就跳过。
- **新旧项目一致**：新项目创建时安装 latest Common `AGENTS.md` / `WEBCHAT_AGENTS.md`；旧项目下一次实际工作前同步，不要求为了同步而一次性批量修改所有闲置 checkout。
- **本地差异独立**：所有 repo-specific instructions、preferences、exceptions 只放根目录 `PROJECT_LOCAL_OVERRIDES.md`；同步 Common files 时不得覆盖这个文件。
- **Common files 必须 exact copy**：适用 Repository 的 `AGENTS.md` / `WEBCHAT_AGENTS.md` 必须与 Common canonical 完整文件 exact match；不得在文件尾部追加 Project Local Overrides。
- **Shared standards 必须 exact copy**：所有 Coding Repo 必须在固定 project-relative path 保留 Common canonical 的 exact local copy：`prompts/common-prompts/standards/CODING_STANDARDS.md`、`prompts/common-prompts/review/CODING_STANDARDS_REVIEW.md`、`prompts/common-prompts/review/INFO_SUMMARY_HTML_REVIEW.md`、`prompts/common-prompts/standards/UI_MOCKUP_STANDARDS.md`、`prompts/common-prompts/standards/INTERVIEW_INFO_SUMMARY_STANDARDS.md`、`prompts/common-prompts/review/INTERVIEW_INFO_SUMMARY_REVIEW.md`；所有保留 Common `AGENTS.md` exact copy 的 Repository 还必须在同样的固定 path 保留 `CLAUDE.md`、`prompts/common-prompts/rules/` 下全部 rule files（`PROJECT_STATE_RULES.md`、`MARKDOWN_DOCUMENT_RULES.md`、`COMMON_RULES_SYNC.md`、`MULTI_AI_ROLES.md`、`GITHUB_ZERO_SPEND_GATE.md`、`ACCOUNTS_AND_SERVICES_INVENTORY.md`、`TEAM_PATTERN_FIRST.md`、`APP_GAME_RULES.md`、`HTML_PAGE_RULES.md`、`INFO_SUMMARY_HTML_RULES.md`）、`prompts/common-prompts/explain/` 下全部文件和 `prompts/common-prompts/templates/` 下全部文件（例如 `INFO_SUMMARY_TEMPLATE.html`）、`info-summary/assets/` 下全部文件（`summary.css`、`summary.js`）的 exact local copy；缺失或 Common 更新时一起同步。Common 删掉的共享文件（例如 2026-11-13 删掉的 `CLOUDFLARE_RESOURCE_INVENTORY.md`），同步时下游也删掉。
- **Control-file drift check**：每次 rules sync 或开始新的 tracked task 时，确认适用的统一入口状态文件存在，并确认总索引 `info-summary/信息汇总-Summary-索引.html` 和信息汇总（如适用）使用当前 schema；还有旧 `ZERO_CONTEXT_AI_HANDOFF.md` / `FEATURE_MAP.md`，或 `ZERO_CONTEXT_AI_HANDOFF_TASK_INDEX.md`、`KNOWLEDGE_MAP.md`、`project-rules/`、`UNDERSTANDING_LOG.md`、`CLOUDFLARE_RESOURCES.md`、`DEPLOYMENT.md` 时按 `prompts/common-prompts/rules/PROJECT_STATE_RULES.md` 的 `旧文件过渡` 迁移；发现 drift 时先修 control structure，再继续新的 implementation。
- **即时采用更新**：如果 canonical files 在 Chat 工作期间更新，update 后的下一步工作必须先 reload requirements；已完成的历史 evidence 不追溯改写。
- **Web Chat refresh**：网页 ChatGPT 不能自动读取本地文件时，Codex 必须在发送下一条工作指令前，把 latest applicable `WEBCHAT_AGENTS.md` 和 `PROJECT_LOCAL_OVERRIDES.md` 作为 requirements refresh 提供给同一个普通 Chat；refresh 完成前不得继续 implementation、review、acceptance 或 scheduled supervision。
- **记录 evidence**：Tracked bounded task 的信息汇总（小任务写在 PR 描述）必须记录本轮 verified canonical commit SHA 或等价 current-source evidence，以及实际读取的 project-local `AGENTS.md` path。
- **Fail closed**：无法 fetch、读取、验证或安全同步 latest canonical rules 时，停止新的实质工作并报告具体 blocker；不得静默使用 stale local copy、旧 prompt 或 Chat memory。
- **权限不扩张**：Rules refresh 只更新工作要求，不增加文件、账号、external action、commit、push 或 deploy 权限，也不得传输 secrets 或无关 private data。

### Chat-managed Document PR Gate

| 条件 / 对象 | 必须遵守 |
|---|---|
| Common canonical `AGENTS.md` / `WEBCHAT_AGENTS.md` | 修改 `common-user-preferences-hub` 的这两个 canonical files 必须从 latest `main` 建 bounded branch → PR → merge；2026-11-13 起 AI 直接合并，不等 Human approval；禁止 AI 直接写 `main`。 |
| Common canonical `prompts/common-prompts/rules/*.md` | 这些 rule files 是从 `AGENTS.md` 拆出的 Common rules：修改时和 Common canonical `AGENTS.md` / `WEBCHAT_AGENTS.md` 一样，必须从 latest `main` 建 bounded branch → PR → merge（AI 直接合并）；merge 后，downstream exact-copy rollout 同样免 PR。 |
| Merged downstream exact-copy rollout | 已 merge 的 Common canonical `AGENTS.md` / `WEBCHAT_AGENTS.md`，可以直接 exact-copy 同步到 downstream repos，不需要为每个 repo 单独开 PR；必须 exact match approved Common blob，不得夹带 local wording、其他文件修改或额外 refactor。 |
| Downstream non-exact AGENTS / WEBCHAT change | 不允许以“同步”名义直接改；通用规则先改 Common canonical 并走上面的 PR gate，repo-specific 差异放 `PROJECT_LOCAL_OVERRIDES.md`。 |
| Web Chat + Knowledge Hub | Web Chat 修改 Knowledge Hub 的任何文件都必须 branch → PR → Human approval → merge，不限是否入口 / state / topic / dated document。 |
| Codex / Claude Code + 普通 Coding Repo 文件 | Source/code/config/tests/pipeline/runtime、`PROJECT_LOCAL_OVERRIDES.md`、信息汇总（包括总索引和规则信息汇总）和普通非入口 documentation 不受本 PR gate；按对应 Coding / Team workflow 执行。 |
| Personal repo 内的 team plain-copy files | 如果 team-originated files 只是 copy 到 personal repo 的普通文件、没有自己的 team remote-linked `.git` working tree，Codex / Claude Code 修改它们必须走 PR + Human approval。 |
| Team remote-linked `.git` files | 任何 AI / Agent 禁止修改 team Git working tree / submodule / nested repo 中由 `.git` 连接 team remote 的文件；只能读取 / 分析，由 Human 手动修改。 |
| Branch / PR scope | 需要 PR 的修改必须从 latest target branch 建 bounded branch，只包含 Human 授权 scope；不得借 PR 扩大修改。 |
| Human approval | Human 明确 approve 前不得 merge；checks PASS、PR created 或 AI review 都不能代替 Human approval。例外：Common repo `common-user-preferences-hub` 的 PR，AI 直接合并，不等 Human approval（2026-11-13 Human 定，见 `AGENTS.md` 的 `Common repo 走 PR，AI 直接合并`）。 |
| Merge after approval | Human approve 后优先 GitHub auto-merge；若不支持，则在同一 approved scope 内普通 merge，不需要第二次 approval。 |
| PR body | 按 `AGENTS.md` 的 `个人 repo 的 PR 描述` 写：中文，提示框写为什么，Mermaid 图画改了什么，改动说明最多 5 行，细节折叠。 |
| Modified files | 逐个列 changed path + why，放进 PR 描述的 `<details>` 折叠里，方便 Human 发现 unintended scope。 |
| WEBCHAT preflight | 每次 create / update PR 前读取 PR head 的 `WEBCHAT_AGENTS.md`（若存在），用 exact Unicode character count（与 Python `len(text)` 一致）确认 `≤5000`（超限时压缩重复内容，不删门槛）；PR body 写 `count/5000`，超限不得 create / update PR。 |
