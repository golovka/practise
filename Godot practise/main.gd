extends Node

var level_path = "res://scenes/level.tscn"


# Called when the node enters the scene tree for the first time.
func _ready():
	randomize()
	var scene_instance = load(level_path).instantiate()
	add_child(scene_instance)


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
