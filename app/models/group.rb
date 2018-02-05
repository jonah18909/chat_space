class Group < ApplicationRecord
  has_many :group_users, foreign_key: 'group_id'
  has_many :users, through: :group_users
  validates :name, presence: true
end
