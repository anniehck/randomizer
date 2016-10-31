class Api::RandomsController < ApiController
  def create
    movie = ENV["MOVIEDB_KEY"]
    nasa = ENV["NASA_KEY"]
    beer = ENV["BREWERYDB_KEY"]
    giphy = ENV["GIPHY_KEY"]
    guitar = ENV["GUITAR_PARTY_KEY"]

    chords = []
    root = ['A', 'Ab', 'A#', 'B', 'Bb', 'C', 'C#', 'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#', 'G', 'Gb', 'G#']
    quality = ['m', 'maj', 'aug', 'dim']
    number = ['7']

    chords += root
    root.each do |chord|
      quality.each do |qual|
        x = "#{chord}#{qual}"
        chords << x
        number.each do |num|
          y = "#{chord}#{qual}#{num}"
          chords << y
        end
      end
    end

    choice = params['choice']
    url = ''
    credit = ''
    random = ''

    if choice == 'movie'
      pages = []
      number = 1
      until number > 4 do
        res = HTTParty.get("https://api.themoviedb.org/3/discover/movie?api_key=#{movie}&language=en-US&page=#{number}&with_genres=27")
        pages += res['results']
        number += 1
      end
      random = pages.sample
    elsif choice == 'giphy'
      url = "http://api.giphy.com/v1/gifs/random?api_key=#{giphy}"
      credit = path_to_asset('sources/giphy_power.png')
      random = HTTParty.get(url)
    elsif choice == 'chord'
      chord = chords.sample
      url = "http://api.guitarparty.com/v2/chords/\?query\=#{chord}"
      random = HTTParty.get(url, headers: { "Guitarparty-Api-Key" => "#{guitar}"})
    else
      url = "http://astrocast.herokuapp.com/bites" if choice == 'space-fact'
      url = "https://api.brewerydb.com/v2/beer/random?hasLabels=Y&key=#{beer}" if choice == 'beer'
      url = "https://api.nasa.gov/planetary/apod?api_key=#{nasa}" if choice == 'apod'
      url = "http://taco-randomizer.herokuapp.com/random/?full-taco=true" if choice == 'taco'

      random = HTTParty.get(url)
    end


    respond_to do |format|
      format.json do
        render json: { data: random, source: credit }
      end
    end
  end

  private

  def path_to_asset(asset)
    ApplicationController.helpers.asset_path(asset)
  end

end
