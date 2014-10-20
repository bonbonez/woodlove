class SurveyUser < ActiveRecord::Base
  attr_accessible :code, :data, :data_liked, :data_best, :name, :gender
  before_save :generate_random_data

  has_many :comments

  def get_data
    result = []
    begin
      result = ActiveSupport::JSON.decode(self.data)
    rescue
      result = nil
    end
    result
  end

  def finished?
    self.current_index >= get_data.length
  end

  def get_data_liked
    result = []
    begin
      result = ActiveSupport::JSON.decode(self.data_liked)
    rescue
      result = nil
    end
    result
  end

  def get_data_best
    result = []
    begin
      result = ActiveSupport::JSON.decode(self.data_best)
    rescue
      result = nil
    end
    result
  end

  def add_to_data_best(item_id)
    data = get_data_best
    if data.is_a?(Array) && data.index(item_id) == nil
      data.push(item_id)
      self.data_best = data.to_s
      save!
    end
  end

  def add_to_data_liked(item_id)
    data = get_data_liked
    if data.is_a?(Array) && data.index(item_id) == nil
      data.push(item_id)
      self.data_liked = data.to_s
      save!
    end
  end

  def generate_random_data
    if self.data == nil
      self.data = Category.find(1).items.map{ |i| i.id }.shuffle.to_s
    end
  end

  def increment_index
    self.current_index += 1
    save!
  end

  def decrement_index
    self.current_index = [0, self.current_index - 1].max
    save!
  end

  def get_current_item
    Item.where(id: get_data[current_index]).last
  end

  def male?
    return self.gender == "male"
  end

  def female?
    return self.gender == "female"
  end
end
