class GamesController < ApplicationController

    def create 
        new_game = Game.create(user:@user, game_won:params['game_won'])
        render json: {newGame:new_game, games: @user.games}
    end 
end
