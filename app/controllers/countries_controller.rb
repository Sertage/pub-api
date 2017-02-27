require 'net/http'

class CountriesController < ApplicationController

  def index
    begin
      @results = []
      # Built by LucyBot. www.lucybot.com
      uri = URI("http://services.groupkt.com/country/get/all")
      http = Net::HTTP.new(uri.host, uri.port)
      request = Net::HTTP::Get.new(uri.request_uri)
      result = http.request(request).body
      split_countries(result)
    rescue Exception => ex
      #p ex.message
      flash[:error] = ex.message
    end
  end

  def states
    begin
      @results = []
      # Built by LucyBot. www.lucybot.com
      uri = URI("http://services.groupkt.com/state/get/#{params[:country]}/all")
      http = Net::HTTP.new(uri.host, uri.port)
      request = Net::HTTP::Get.new(uri.request_uri)
      @result = http.request(request).body

      #split_countries(result)
    rescue Exception => ex
      #p ex.message
      flash[:error] = ex.message
    end
  end

  private

  def split_countries(result)
    results = result.split('"result" : [ {').at(1).split('}, {')
    results.each{ |res|
      c = res.split("\n")
      country = []
      country  << get_country_name(c.at(1))
      country  << get_country_code2(c.at(2))
      country  << get_country_code3(c.at(3))
      @results << country
    }
  end

  def get_country_name(str)
    str[16..(str.length-3)]
  end

  def get_country_code2(str)
    str[23..(str.length-3)]
  end

  def get_country_code3(str)
    str[23..(str.length-2)]
  end

end