workflow "Validate" {
  on = "push"
  resolves = ["test"]
}

action "install" {
  uses = "actions/npm@master"
  runs = "yarn"
}

action "test" {
  needs = "install"
  uses = "actions/npm@master"
  runs = "yarn"
  args = "test"
}
