const readline = require('readline');

class Game {
    constructor() {
        this.players = {
            player1: {
                name: '',
                active: false,
            },
            player2:  {
                name: '',
                active: false,
            },
            computer:  {
                name: 'R2D2',
                active: false,
            },
        };
        this.board = [];
        this.cli = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    };

    async start() {
        await this.config();
    }

    displayBoard() {
        return new Promise((resolve) => {
            this.cli.write('\n\n');
            this.board.forEach((column, columnIndex) => {
                let board = '';
                this.board[columnIndex].forEach((row, rowIndex) => {
                    let markerString = this.board[columnIndex][rowIndex].toString();
                    const displayRow = ' ' + markerString.replace('0', '-').replace('-1', 'O').replace('1', 'X');
                    board += displayRow;
                })
                this.cli.write( board + '\n' );
            })
            this.cli.write('\n\n');
            resolve();
        })
    }

    async config() {
        const welcomeMessage = () => {
            return new Promise(resolve => {
                this.cli.write("\n\n");
                this.cli.write("Welcome to Tic Tac Toe 2.0!\n");
                this.cli.write("=========================\n\n");
                this.cli.write("Two human players will play against each other and against the computer.\n");
                this.cli.write("Who will go first is random\n");
                this.cli.write("=========================\n\n");
                resolve();
            })
        }

        const askBoardSize = () => {
            return new Promise((resolve) => {
                this.cli.question('What size would you like your board to be?\n', (answer) => {
                    for (let i = 0; i < Number(answer); i++) {
                        this.board.push([]);
                    }

                    this.board.forEach((item) => {
                        for (let i = 0; i < Number(answer); i++) {
                            item.push(0);
                        }
                    })

                    resolve(this.board);
                });
            })
        }

        const askPlayer1Name = () => {
            return new Promise((resolve) => {
                this.cli.question('Player 1 please choose your username\n', (answer) => {
                    this.players.player1.name = answer;
                    resolve();
                });
            })
        }

        const askPlayer2Name = () => {
            return new Promise((resolve) => {
                this.cli.question('Player 2 please choose your username\n', (answer) => {
                    this.players.player2.name = answer;
                    resolve();
                });
            })
        }

        const setFirstPlayer = () => {
            return new Promise((resolve) => {
                const playersList = Object.keys(this.players);
                const firstPlayer = playersList[Math.floor(Math.random() * (playersList.length))];
                this.players[firstPlayer].active = true;
                resolve();
            })
        }

        await welcomeMessage();
        await askBoardSize();
        await askPlayer1Name();
        await askPlayer2Name();
        await setFirstPlayer();
        return this.displayBoard();
    };
    
}

const game = new Game();
game.start();