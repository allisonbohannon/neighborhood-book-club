class RelationshipsController < ApplicationController
  before_action :set_relationship, only: [:show, :update, :destroy]

  # GET /relationships
  def index
    @relationships = Relationship.all

    render json: @relationships
  end

  # GET /relationships/1
  def show
    render json: @relationship
  end

  # POST /relationships
  def create
    @relationship = Relationship.new(relationship_params)

    if @relationship.save
      render json: @relationship, status: :created, location: @relationship
    else
      render json: @relationship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /relationships/1
  def update
    if @relationship.update(relationship_params)
      render json: @relationship
    else
      render json: @relationship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /relationships/1
  def destroy
    @relationship.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_relationship
      @relationship = Relationship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def relationship_params
      params.require(:relationship).permit(:follower_id, :following_id)
    end
end
