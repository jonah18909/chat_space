class GroupUser < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :group_id, :user_id, presence: true
end
