re 'pry'

class Greeter
  #自动定义两个方法 name为取值  name=为给值
  attr_accessor :name

  def initialize(name = "World")
    @name = name
  end

  def say_hi
    if @name.nil?
      puts "..."
    elsif @name.respond_to?("each")
      @name.each do |name|
        puts "hello #{name}"
      end
    else
    puts "Hi,#{@name}"
    end
  end

  def say_bye
    if @name.nil?
      puts "..."
    elsif @name.respond_to?("join")
      puts "Goodbye #{@name.join(", ")}. come back"
    else
      puts "Bye,#{@name},come back"
    end
  end

end

if __FILE__ == $0
  mg = Greeter.new
  mg.say_hi
  mg.say_bye

  binding.pry
  mg.name = "rjy"
  mg.say_hi
  mg.say_bye

  binding.pry
  mg.name = ["rjy", "rjx"]
  mg.say_hi
  mg.say_bye

  binding.pry
  mg.name = nil
  mg.say_hi
  mg.say_bye
end

