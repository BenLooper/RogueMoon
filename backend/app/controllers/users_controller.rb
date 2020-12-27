class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        newUser = User.new(username:params[:username], password:params[:password]) 
        if newUser.valid? 
            newUser.save
            Card.all.each {|card| OwnedCard.create(user:newUser, card:card)}
            render json: { success:true}
        else 
            render json: {exists:true}
        end 
    end 

    def destroy 
        User.destroy(params[:id])
    end 
end
