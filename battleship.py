import re

BOARD_SIZE = 8
SHIP_SIZE = 3


def map_char_to_num(char):
    """
    Map an uppercase alphabet letter to an integer, e.g. A -> 1
    """
    return ord(char) - 64


def map_num_to_char(num):
    """
    Map an integer to an uppercase alphabet letter, e.g. 1 -> A
    """
    return chr(ord('@')+num)


def check_ship_direction(head, tile):
    """
    Return whether ship is placed horizontally ("H") or vertically ("V")
    """
    h_c, h_r = head[0], head[1]
    t_c, t_r = tile[0], tile[1]

    if h_r == t_r:
        return "H"
    elif h_c == t_c:
        return "V"
    else:
        raise ValueError(
            "You can only place your ship horizontally or vertically.")


def check_place(head, tile, direction):
    """
    Return True if the head and tile of the ship can be placed on the board properly
    Otherwise, raise error
    """
    col_h, row_h = map_char_to_num(head[0]), int(head[1])
    col_t, row_t = map_char_to_num(tile[0]), int(tile[1])

    if direction == "H" and col_t-col_h == SHIP_SIZE-1:
        return row_h < BOARD_SIZE+1 and col_h < BOARD_SIZE-1
    elif direction == "V" and row_t-row_h == SHIP_SIZE-1:
        return row_h < BOARD_SIZE-1 and col_h < BOARD_SIZE+1
    else:
        raise ValueError(
            "It seems like you place your ship either outside the board or the size is wrong.")


def check_fire(row, col):
    """
    Return True if the fire location is valid.
    """
    return row < BOARD_SIZE+1 and col < BOARD_SIZE+1


def split_num_char(text):
    """
    Check if the input text follows the required pattern.
    If not, raise error.
    """
    patter_found = re.match(r'^[A-Z]\d+$', text)
    if patter_found:
        return re.split(r'(\d+)', text)[0:2]
    else:
        raise ValueError("Please follow the input format!")


def check_input_format(text):
    """
    Check if the input only contains required and formated content.
    If not, raise error.
    """
    splited = text.split(" ")
    # Fire case
    if len(splited) == 1:
        return split_num_char(splited[0])
    # Place ship case
    elif len(splited) == 2:
        coords = []
        for item in splited:
            coords.append(split_num_char(item))
        return coords
    else:
        raise ValueError("Please follow the input format!")


class Ship:
    """
    Object for ship.
    Each player has one ship that is 3 grid units in length.
    Ship can be placed on the board either vertically ("V") or horizontally ("H").
    """

    def __init__(self) -> None:
        self._length = SHIP_SIZE
        self.hits = 0  # Record how many time the ship was hit
        self.pos = []  # Store ship's position on the board

    def place(self, row, col, direction):
        """
        Place ship by providing row, column, and direction.
        """
        for i in range(self._length):
            # Record coordinates of the ship
            if direction == "H":
                self.pos.append((row-1, col+i-1))
            else:
                self.pos.append((row+i-1, col-1))

    def is_sunk(self):
        """
        A ship is sunk when all the parts have been hit.
        """
        return self.hits == self._length


class Player:
    """
    Object for player.
    Each player has a ship and a board.
    Opponent is to record the opponent of current player.
    """

    def __init__(self, name) -> None:
        self.name = name
        self.opponent = None
        self.ship = Ship()  # Create a ship object
        self.board = []
        for i in range(BOARD_SIZE):
            self.board.append(['_'] * BOARD_SIZE)

    def place_ship(self, head, tile, direction):
        """
        Place your ship on the board.
        The ship will marked as "S" on the board.
        """
        # chech if the ship is placed in valid locations.
        if check_place(head, tile, direction):
            col, row = map_char_to_num(head[0]), int(head[1])
            self.ship.place(row, col, direction)

            for x, y in self.ship.pos:
                self.board[x][y] = "S"

        else:
            raise ValueError("You can not place your ship outside the board!")

    def fire(self, row, col):
        """
        Player can select a location to fire.
        The location marked "X" if it has been fired. 
        A hit is when a ship part is in a grid unit that a player fires at.
        Otherwise, print Miss.
        """
        # first check if the fire location is valid
        if check_fire(row, col):
            if self.opponent.board[row-1][col-1] == "S":
                self.opponent.ship.hits += 1
                print("Hit!\n")
                # if opponent's ship is sunk, current player wins
                if (self.opponent.ship.is_sunk()):
                    print(
                        "Congratulations Player %s, you sunk Player %s's battleship." % (self.name, self.opponent.name))
                    return True
            # you should not fire a location twice.
            elif self.opponent.board[row-1][col-1] == "X":
                raise ValueError(
                    "You have already fired this location before!")
            else:
                print("Miss.\n")
            self.opponent.board[row-1][col-1] = "X"
        else:
            raise ValueError("You can not hire outside the board!")

    def show_board(self):
        """
        Columns are labeled A to H.
        Rows are labeled 1 to 8.
        """
        for r in range(BOARD_SIZE+1):  # row
            if r == 0:
                print(" ", end=' ')
            else:
                print(r, end=' ')

            for c in range(BOARD_SIZE+1):  # column
                if r == 0:
                    if c > 0:
                        print(map_num_to_char(c), end=' ')
                else:
                    if c < BOARD_SIZE:
                        print(self.board[r-1][c], end=' ')

            print("\n")


class Game:
    """
    Object for game. 
    Two players take turns firing at their opponents ship.
    A ship is sunk when all the parts have been hit.
    """

    def __init__(self) -> None:
        # create two player objects
        self.player1 = Player("1")
        self.player2 = Player("2")
        self.current_player = self.player1  # record current player
        # assign opponent to each player
        self.player1.opponent = self.player2
        self.player2.opponent = self.player1

    def set_ships(self):
        """
        Prompt to let two players provide their initial ship location.
        """
        for player in [self.player1, self.player2]:
            player.show_board()

            # Loop until the input is valid.
            while(True):
                try:
                    pos = input(
                        "Please enter the initial ship location for Player %s (Format: A3 A5): " % player.name)
                    [head, tile] = check_input_format(pos)
                    # Check if the ship is placed horizontally or vertically
                    direction = check_ship_direction(head, tile)
                    player.place_ship(head, tile, direction)

                    # Valid coordinates were placed, so break out
                    break

                except (ValueError, IndexError) as e:
                    print("%s \nPlease try again." % e)

    def play(self):
        """
        Players take turns firing at opponent's ship until one wins the game.
        """
        # Loop until a player wins.
        game_over = False
        while (not game_over):
            # Show current player's board whenever it's the player's turn.
            print("Player %s Board: " % self.current_player.name)
            self.current_player.show_board()

            # Loop until the input is valid.
            while(True):
                try:
                    hit = input("Provide a location to hit Player %s's ship (Format: B5): " %
                                self.current_player.opponent.name)
                    # check format of the input
                    formated_coords = check_input_format(hit)

                    col, row = map_char_to_num(
                        formated_coords[0]), int(formated_coords[1])
                    # fire at opponent's ship
                    game_over = self.current_player.fire(row, col)

                    # Valid move was made, so break out
                    break

                except (ValueError, IndexError) as e:
                    print("%s \nPlease try again." % e)
            # switch current player
            self.current_player = self.current_player.opponent


if __name__ == '__main__':
    print("Game start....")
    # create a game object
    game = Game()
    # place ships on the board
    game.set_ships()
    # players begin to fire at each other
    game.play()
    print("Game over....")
