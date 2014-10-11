class Cart < ActiveRecord::Base
  attr_accessible :cookie_id, :data

  before_save :generate_unique_cookie_id, :ensure_data_not_empty

  def get_data
    d = self.data
    return data_dummy if d.nil?

    begin
      #result = ActiveSupport::Base64.decode64(d)
      result = ActiveSupport::JSON.decode(d)
    rescue
      result = data_dummy
    end
    result
  end

  def set_data(obj)
    d = obj.to_json.to_s
    #d = ActiveSupport::Base64.encode64(d)
    self.data = d
    self.save
  end

  def add_item(item_id)
    return inc_item(item_id) if item_exists?(item_id)
    d = get_data
    d["items"].push({id: item_id, amount: 1})
    set_data(d)
  end

  def remove_item(item_id)
    return nil if !item_exists?(item_id)
    data = get_data
    data["items"].delete_at(get_item_index(item_id))
    puts data["items"]
    set_data(data)
  end

  def inc_item(item_id)
    add_item(item_id) if !item_exists?(item_id)
    item = get_item(item_id)
    item["amount"] += 1
    update_item(item)
  end

  def dec_item(item_id)
    return if !item_exists?(item_id)
    item = get_item(item_id)
    item["amount"] -= 1
    update_item(item)
  end

  def item_present?(item)
    item_exists?(item.id)
  end

  def get_items
    items_ids = get_data["items"].collect{ |i| i["id"] }
    Item.find(items_ids)
  end

  def get_item(item_id)
    return nil if !item_exists?(item_id)
    return get_data["items"].select { |item| item["id"] }.last
  end

  def get_item_amount(item_id)
    return nil if !item_exists?(item_id)
    return get_item(item_id)["amount"]
  end

  protected

  def item_exists?(item_id)
    item_id = "#{item_id}" if item_id.is_a?(Numeric)

    d = get_data
    items = d["items"].collect { |item| item["id"] }
    items.index(item_id) == 0 || items.index(item_id) != nil
  end

  def update_item(item)
    return if !item_exists?(item["id"])
    return remove_item(item["id"]) if item["amount"] < 1

    d = get_data
    d["items"][ d["items"].index{|i| i["id"] == item["id"]} ] = item
    #puts d["items"]
    set_data(d)
  end

  def get_item_index(item_id)
    get_data["items"].index{|i| i["id"] == item_id}
  end

  def generate_unique_cookie_id
    if self.cookie_id.nil?
      self.cookie_id = loop do
        random_token = SecureRandom.urlsafe_base64(nil, false)
        break random_token unless Cart.exists?(cookie_id: random_token)
      end
    end
  end

  def ensure_data_not_empty
    if self.data.nil?
      self.data = data_dummy.to_json
    end
  end

  def data_dummy
    return { "items" => [] }
  end
end
