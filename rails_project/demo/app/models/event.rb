class Event < ApplicationRecord
  validates_presence_of :name
  has_many :attendees
  belongs_to :category, :optional => true
end
