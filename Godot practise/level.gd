extends Node2D

var puzzle_piece_path = "res://scenes/puzzle_piece.tscn"
var puzzle_texture_path = "res://Art/placeholder image.jpg"
var rows = 1
var cols = 5
var gap = 10
var index_array :Array = []
var position_array :Array = []
var compare_array :Array = []
var switcher_array :Array = [null, null, null]

# Called when the node enters the scene tree for the first time.
func _ready ( ):
	
	var screen_x = get_viewport().size.x
	var screen_y = get_viewport().size.y
	
	
	var board_x
	var board_y
	if screen_x <= screen_y:
		board_x = screen_x * 0.98
		board_y = board_x
		
	if screen_y < screen_x:
		board_y = screen_y * 0.98
		board_x = board_y
		
		
	var pic_x = load(puzzle_texture_path).get_size().x
	var pic_y = load(puzzle_texture_path).get_size().y
	
	
	
	var pp_w = pic_x / cols
	var pp_h = pic_y / rows
	
	
	get_node("Puzzle_Board").position = Vector2(screen_x/2, screen_y/2)
	var scale_var = board_x/load("res://icon.svg").get_size().x 
	get_node("Puzzle_Board").scale = Vector2(scale_var, scale_var)
	
	#generate two 2d arrays of set size
	
	for i in range(rows):
		index_array.append([])
		for j in range(cols):
			index_array[i].append(null)
	
	for i in range(rows):
		position_array.append([])
		for j in range(cols):
			position_array[i].append(null)
	
	var index = 0
	
	#it generates grid of puzzlie_piece scenes and generates two 2d arrays with indexes and positions 
	for ny in range(rows):
		for nx in range(cols):
	
			var puzzle_piece_instance = load(puzzle_piece_path).instantiate()
			
			puzzle_piece_instance.get_node("Puzzle_Picture").texture = load(puzzle_texture_path)
			
			puzzle_piece_instance.get_node("Puzzle_Picture").region_rect = Rect2(nx*pp_w, ny*pp_h, pp_w, pp_h)
			
			var b # this one scales pieces to right sizes
			if pic_x >= pic_y : 
				var a = pic_x
				
				b = _scaler(a, board_x - (cols+1)*gap)
				
				puzzle_piece_instance.get_node("Puzzle_Picture").scale = Vector2(b, b)
				
			if pic_y > pic_x:  # this one too
				var a = pic_y
				
				b = _scaler(a, board_y - (rows+1)*gap)
				
				puzzle_piece_instance.get_node("Puzzle_Picture").scale = Vector2(b, b)
			
			puzzle_piece_instance.position = Vector2((screen_x/2 - (cols*pp_w*b + (cols+1)*gap)/2 + pp_w*b/2 + gap + (nx*(pp_w*b + gap))),\
			((screen_y/2) - (rows*pp_h*b + (rows+1)*gap)/2 + pp_h*b/2 + gap + (ny*(pp_h*b + gap))))
			
			# make pieces indexed
			puzzle_piece_instance.index = index
			index_array[ny][nx] = index
			
			# save puzzle_piece positions
			position_array[ny][nx] = puzzle_piece_instance.position
			puzzle_piece_instance.name = "puzzle_piece_" + str(index)
			
			puzzle_piece_instance.get_node("Pp_Button").texture_hover.width = pp_w*b
			puzzle_piece_instance.get_node("Pp_Button").texture_hover.height = pp_h*b
			puzzle_piece_instance.get_node("Pp_Button").texture_pressed.width = pp_w*b
			puzzle_piece_instance.get_node("Pp_Button").texture_pressed.height = pp_h*b
			
			
			add_child(puzzle_piece_instance)
			
			# timer.timeout.connect(_on_timer_timeout)
			
			get_node("puzzle_piece_" + str(index)).button_is_toggled.connect(_on_puzzle_piece_is_toggled) # TODO
			
			index += 1
	
	compare_array = index_array.duplicate(true)
	
	_shuffle_level_indexes(index_array)
	
	if (compare_array == index_array):
		print ("true")
	else:
		print ("false")
	
	for i in range(rows):
		for j in range(cols):
			print("compare array ", i, " ", j, " value ", compare_array[i][j])
			
	for i in range(rows):
		for j in range(cols):
			print("index array ", i, " ", j, " value ", index_array[i][j])
	
	var count = 0
	while compare_array == index_array:
		_shuffle_level_indexes(index_array)
		print(count)
		count +=1
	# Check if array generated properly
	for i in rows:
		for j in cols:
			
			print("row ", i, " column ", j, " element ", index_array[i][j])
			
	_allign_puzzle_pieces(index_array)


func _shuffle_level_indexes(unshuffled_2d_array): # it shuffles indexes of pieces
	var sx
	var sy
	var bubble
	
	for i in range(rows):
		for j in range(cols):
			sx = randi() % cols
			sy = randi() % rows
			bubble = unshuffled_2d_array[sy][sx]
			unshuffled_2d_array[sy][sx] = unshuffled_2d_array[i][j]
			unshuffled_2d_array[i][j] = bubble


func _allign_puzzle_pieces(index_array): # initial allign of puzzle pieces
	var puzzle_piece_selected
	var z = 0
	for i in range(rows):
		for j in range(cols):
			puzzle_piece_selected = get_node("puzzle_piece_" + str(z))
			puzzle_piece_selected.position = _linear_search_and_address_return(get_node("puzzle_piece_" + str(z)))
			z +=1
	for i in range(rows):
		for j in range(cols):
			print("position array ", i, " ", j, " value ", position_array[i][j])


func _linear_search_and_address_return(puzzle_piece): # gets index of a puzzle piece and returns position of a said piece
	
	var a = puzzle_piece.index
	#linear search
	var looker
	var i = 0
	var j = 0
	while i < rows:
		while j < cols:
			looker = index_array[i][j]
			if looker == a:
				break
			j += 1
		if looker == a:
			break
		j = 0
		i += 1
	var b = position_array[i][j]
	
	return b


func _scaler(source, goal): # returns multiplier
	
	return (goal / source)


func _process(delta): # Called every frame. 'delta' is the elapsed time since the previous frame.
	pass

var first_pp_is_toggled = false
var second_pp_is_toggled = false
var first_pp_index
var second_pp_index
var toggled_count = 0
func _on_puzzle_piece_is_toggled(is_pressed, pieces_index): # Function of swapping puzzle pieces
	print(is_pressed, " ", pieces_index)
	
	if not first_pp_is_toggled and not second_pp_is_toggled:
		toggled_count = 0
	
	if not is_pressed: # If piece untoggled
		if pieces_index == first_pp_index:
			first_pp_index = null
			first_pp_is_toggled = false
		if pieces_index == second_pp_index:
			second_pp_index = null
			second_pp_is_toggled = false
	
	
	if is_pressed: # if toggled but no action yet
		if toggled_count == 0:
			first_pp_index = pieces_index
			first_pp_is_toggled = true
			print("first_pp_index", first_pp_index)
		if toggled_count == 1:
			second_pp_index = pieces_index
			second_pp_is_toggled = true
			print("second_pp_index", second_pp_index)
		toggled_count += 1
	
	if first_pp_is_toggled and second_pp_is_toggled: # If two pieces toggled
		swapper(first_pp_index, second_pp_index)
		get_node("puzzle_piece_" + str(first_pp_index)).get_node("Pp_Button").button_pressed = false
		get_node("puzzle_piece_" + str(second_pp_index)).get_node("Pp_Button").button_pressed = false
		first_pp_is_toggled = false
		second_pp_is_toggled = false
		first_pp_index = null
		second_pp_index = null
		toggled_count = 0
		


func swapper(first_pp_index, second_pp_index): # TODO make pieces swap
	var bubble
	var first :Vector2
	var second :Vector2
	first = _linear_search_and_indexes_return(index_array, first_pp_index)
	second = _linear_search_and_indexes_return(index_array, second_pp_index)
	
	index_array[first.x][first.y] = second_pp_index
	index_array[second.x][second.y] = first_pp_index
	print("swap" )
	for i in range(rows):
		for j in range(cols):
			print("index array ", i, " ", j, " value ", index_array[i][j])
	get_node("puzzle_piece_" + str(first_pp_index)).position = _linear_search_and_address_return(get_node("puzzle_piece_" + str(first_pp_index)))
	get_node("puzzle_piece_" + str(second_pp_index)).position = _linear_search_and_address_return(get_node("puzzle_piece_" + str(second_pp_index)))

func _linear_search_and_indexes_return(array, value):
	var b :Vector2
	var a = value
	#linear search
	var looker
	var i = 0
	var j = 0
	while i < rows:
		while j < cols:
			looker = index_array[i][j]
			if looker == a:
				break
			j += 1
		if looker == a:
			break
		j = 0
		i += 1
	b.x = i
	b.y = j
	
	return b
	print()
