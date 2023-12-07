extends Node2D
@export var index :int = 0
signal button_is_toggled
var is_toggled = false
var button_is_pressed = false

var press_check

# Called when the node enters the scene tree for the first time.
func _ready():
	get_node("Pp_Button").button_pressed = false
	press_check = get_node("Pp_Button").button_pressed
	


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process ( delta ):
	
	if press_check != get_node("Pp_Button").button_pressed:
		button_is_toggled.emit(get_node("Pp_Button").button_pressed, index)
		press_check = get_node("Pp_Button").button_pressed
	


#func _set_picture_path(value):
	#Puzzle_Picture.Resource.Path = value
	#puzzle_piece_path



