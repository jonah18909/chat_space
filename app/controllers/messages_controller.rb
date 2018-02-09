class MessagesController < ApplicationController
  def index
    @messages = "Hello World!"
    @group = Group.find(params[:group_id])
  end

  def create
  end
end
