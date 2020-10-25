class Api::V1::GoogleStoresController < ApplicationController
  def index
    places = GetGooglePizzaListService.new(params[:latitude], params[:longitude]).call
    render json: places
  end

  def show 
    render json: GetGooglePizzaDetailsService.new(params[:id]).call
  end 
end