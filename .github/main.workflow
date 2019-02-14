workflow "Validate" {
  on = "push"
  resolves = ["test"]
}

action "install" {
  uses = "actions/npm@master"
  runs = "yarn"
}

action "lint" {
  needs = "install"
  uses = "actions/npm@master"
  runs = "yarn"
  args = "lint"
}

action "test" {
  needs = "lint"
  uses = "actions/npm@master"
  runs = "yarn"
  args = "test"
}
