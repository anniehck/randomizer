class Api::RandomsController < ApiController
  def create
    movie = ENV["MOVIEDB_KEY"]
    nasa = ENV["NASA_KEY"]
    beer = ENV["BREWERYDB_KEY"]
    giphy = ENV["GIPHY_KEY"]

    choice = params['choice']
    url = ''
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
    else
      url = "http://astrocast.herokuapp.com/bites" if choice == 'space-fact'
      url = "https://api.brewerydb.com/v2/beer/random?hasLabels=Y&key=#{beer}" if choice == 'beer'
      url = "https://api.nasa.gov/planetary/apod?api_key=#{nasa}" if choice == 'apod'
      url = "http://taco-randomizer.herokuapp.com/random/?full-taco=true" if choice == 'taco'
      url = "http://api.giphy.com/v1/gifs/random?api_key=#{giphy}" if choice == 'giphy'

      random = HTTParty.get(url)
    end


    respond_to do |format|
      format.json do
        render json: { data: random }
      end
    end
  end

end
