# Terraform Coding Standards

## Version

| Version | Updated |
|---|---|
| 2026-09-30-17-08 | Promote environment-specific values to per-environment tfvars and add common Terraform best practices. |
| 2026-11-01 | Point to the self-check list: `prompts/common-prompts/review/CODING_STANDARDS_REVIEW.md` check 11 `Terraform Review Checks`. |

## Mandatory Terraform Rules

| Rule | 说白了 | Correct | Incorrect | 最简单例子 |
|---|---|---|---|---|
| **No environment hardcoding in Terraform logic** | DEV/UAT/PROD/Sandbox 会变化的值不能写死在 resource/module 逻辑里。 | resource name、SKU、CIDR、subscription/resource IDs 从 variables 输入。 | `resource_group_name = "prod-rg"` 写死在 reusable module。 | `var.resource_group_name`。 |
| **One tfvars file per environment** | 每个环境必须有自己明确命名的 values file。 | `tfvars/dev.tfvars`、`tfvars/uat.tfvars`、`tfvars/prod.tfvars`。 | 一个 `terraform.tfvars` 混 DEV/PROD，再靠 comment 切换。 | PROD pipeline 只加载 `tfvars/prod.tfvars`。 |
| **Variables define interface; tfvars provide environment values** | `variables.tf` 定义“需要什么”，`.tfvars` 定义“这个环境具体是什么”。 | variable 有 type/description/validation；环境值在 tfvars。 | 在 `variables.tf` default 里塞 production resource ID 作为环境配置。 | `variable "location"` + `prod.tfvars: location = "australiaeast"`。 |
| **Secrets never committed to tfvars** | tfvars 是配置，不是 secret vault。 | secret 从 TFC/TFE variable、GitHub/ADO secret、Key Vault 等注入。 | password/token/key 写进 committed `prod.tfvars`。 | `TF_VAR_api_token` 来自 secret store。 |
| **Use locals for derived values / true invariants** | 计算出来的值或代码本身固定的规则可以放 `locals`，不要为了形式全塞 tfvars。 | naming suffix、derived tags、resource map transformation 用 locals。 | 每个纯计算中间值都暴露成 input variable。 | `local.name = "${var.app}-${var.environment}"`。 |
| **Team Pattern First** | Team repo 先 follow existing Terraform module/caller/file/naming pattern。 | 先读相近 module/caller 再改。 | 现有 module pattern 能用，却另外造一套 folder/interface。 | Team 都用 `variables.tf + main.tf + outputs.tf`，新 module 继续一致。 |

## Module Design

- Keep module interfaces small and cohesive. Avoid both giant flat variable lists and one mega-object.
- Use explicit types, descriptions, sensible defaults only when the default is truly environment-independent, and validation for constrained inputs.
- Keep reusable modules environment-agnostic. Environment identity belongs in callers/tfvars, not reusable module internals.
- Prefer stable `for_each` keys when resource identity matters; avoid index-based identity when list reordering could recreate resources.
- Keep `outputs.tf` limited to values real callers need. Do not expose every resource attribute by default.
- Split files by responsibility only when it improves readability; `variables.tf`, `locals.tf`, `outputs.tf` and focused resource files are enough for most modules.
- Reuse existing modules and conventions before creating a new abstraction.

## State And Safety

- Do not manually edit Terraform state unless the current task explicitly requires a reviewed state operation.
- Treat resource address changes, `for_each` key changes, provider changes, moved/import operations, and destroy/recreate plans as high-risk.
- Run `terraform fmt`, `terraform validate`, and an appropriate plan/static validation before claiming a Terraform change is done.
- For Team environments, follow existing approval/plan/apply workflow; Personal Project direct-to-main rules do not override Team delivery controls.

## Review

- After any Terraform change, report every row of `Terraform Review Checks` (check 11) in `prompts/common-prompts/review/CODING_STANDARDS_REVIEW.md` with status and evidence; a change without that report is not done.
