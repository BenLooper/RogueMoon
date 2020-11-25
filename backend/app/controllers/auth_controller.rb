class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create 
        user = User.find_by username:params[:username]
        if user && user.authenticate(params[:password])
            token = encode_token({user_id: user.id})
            render json: { user: user, jwt: token, cards: user.cards, games:user.games}, status: :accepted
        else 
            render json: {error:"Incorrect username or password"}, status: :unauthorized
        end 
    end 

    def known 
        render json: { user: @user, cards: @user.cards, games:@user.games}, status: :accepted 
    end 
end 