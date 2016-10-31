class Api::RandomsController < ApiController
  def create
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
      url = "http://api.guitarparty.com/v2/chords/\?query\=#{chord_combination}"
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
  def movie
    ENV["MOVIEDB_KEY"]
  end

  def nasa
    ENV["NASA_KEY"]
  end

  def beer
    ENV["BREWERYDB_KEY"]
  end

  def giphy
    ENV["GIPHY_KEY"]
  end

  def guitar
    ENV["GUITAR_PARTY_KEY"]
  end

  def path_to_asset(asset)
    ApplicationController.helpers.asset_path(asset)
  end

  def chord_combination
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
    chords.sample
  end
end
