

import React, { useState, useEffect, ChangeEvent} from 'react';
import { Movie } from './Movie';
import { MoviesProperties } from './Moviesproperties';
import { Search } from './Search';


export function ComponentsHolder() {

  const [searchValue, setSearch] = useState<string>("");
  let key  = "9a641d7ad668061cbadbd503b17ed7cf";
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchValue}`;
  const POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=20`;




  const [ListOfData, setListOfData] = useState<MoviesProperties[]>([])
  console.log(ListOfData)

  useEffect(() => {
    fetch(POPULAR_API)
      .then((res) => res.json())
      .then((data) => {
        setListOfData(data.results)

      })

  }, [])

  const HandleClick = (e: ChangeEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      fetch(SEARCH_API, { method: "Get" })
        .then((res) => res.json())
        .then((data) => {
          setListOfData(data.results)
          setSearch("")
        })

    } catch (e) {
      console.log(e);
    }

    console.log(ListOfData)

  }

  const HandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

    setSearch(e.target.value)
  }


  return (
    <>
      <div className="parent-wrapper">

        <Search HandleClick={HandleClick} HandleOnChange={HandleOnChange} searchValue={searchValue} />

        <div className='movie-collection-wrapper'>

          {

            ListOfData.length > 0 ?
              ListOfData.map((movie: MoviesProperties, i: number) => <Movie key={i} {...movie} />)
              : <p id='no-matching-movies'>
                No matching movies were found :)
              </p>

          }

        </div>

      </div>
    </>
  );
}


