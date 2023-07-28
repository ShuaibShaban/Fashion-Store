class UserRoleSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :role_id
  belongs_to :user
  belongs_to :role
end
