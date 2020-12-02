class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        newUser = User.create(username:params[:username], password:params[:password]) 
        Card.all.each {|card| OwnedCard.create(user:newUser, card:card)}
        render json: { success:true}
    end 

    def destroy 
        User.destroy(params[:id])
    end 
end
