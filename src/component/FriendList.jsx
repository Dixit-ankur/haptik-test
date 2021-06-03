import React, { useEffect, useMemo, useState } from 'react';
import ActiveStar from './activeStar.svg';
import DeactivatedStar from './deactivatedStar.svg';
import Delete from './delete.svg';

const FriendList = () => {
    const [InitialState, setInitialState] = useState([
        {
            id: 1,
            name: 'test1',
            isfavourite: false,
        },
        {
            id: 2,
            name: 'test2',
            isfavourite: true,
        },
        {
            id: 3,
            name: 'test3',
            isfavourite: false,
        },
        {
            id: 4,
            name: 'test4',
            isfavourite: true,
        },
        {
            id: 5,
            name: 'test5',
            isfavourite: false,
        }
    ]);
    const [friends, setFriends] = useState([]);
    const [sort, setSort] = useState(false)
    let current_page = 1;
    let records_per_page = 4;

    useEffect(() => {
        // effect
        setFriends(InitialState);
        changePage(current_page)
        return () => {
            // cleanup
            console.log(`useEffect cleanup`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [InitialState])

    const inputTextHandler = (event) => {
        // eslint-disable-next-line array-callback-return
        let newFriendList = InitialState.filter((friend) => {
            if (friend.name === event.target.value) {
                return friend;
            }
        });
        setFriends((prevState) => {
            if (newFriendList.length === 0) {
                return [...prevState]
            }
            else {
                return [...newFriendList]
            }
        });
    }

    const addFriendHandler = (event) => {
        if (event.keyCode === 13 && event.target.value !== '') {
            InitialState.push({
                id: InitialState.length + 1,
                name: event.target.value,
                isfavourite: false
            });
            current_page = 1;
            changePage(current_page);
            setInitialState(InitialState);
            inputTextHandler(event);
        }


    }

    const deleteFriendHandler = (friendId) => {
        let newFriendList = friends.filter((friend) => {
            if (friend.id !== friendId) {
                return friend;
            }
        });
        setFriends(newFriendList);
    }

    const changeFavouriteHandler = (friendId) => {
        let newFriendList = friends.filter((friend) => {
            if (friend.id === friendId) {
                friend.isfavourite = !friend.isfavourite;
            }
            return friend;
        });
        setFriends(newFriendList);
    }

    const prevPage = () => {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
        else {
            current_page = 1;
            changePage(current_page);
        }
    }

    const nextpage = () => {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }

    const changePage = (page) => {
        current_page = page
        if (page < 1) page = 1;
        if (page > numPages()) {
            page = numPages();
            // nextDisabled = true;
        };

        let temp = [];
        for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
            if (InitialState[i]) {
                temp.push(InitialState[i])
                setFriends(temp);
            }
        }

        if (page === 1) {
            // prevDisabled = true;
        } else {
            // prevDisabled = false;
        }

        if (page === numPages()) {
            // nextDisabled = true;
        } else {
            // nextDisabled = false;
        }
    }
    const numPages = () => {
        return Math.ceil(InitialState.length / records_per_page);
    }

    const sortHandler = () => {
        let sorting = !sort;
        InitialState.sort(function (x, y) {
            if (sorting === true) {
                // true values first
                // return (x.isfavourite === y.isfavourite) ? 0 : x ? -1 : 1;
                return y.isfavourite - x.isfavourite
            }
            else {
                // false values first
                // return (x.isfavourite === y.isfavourite) ? 0 : x ? 1 : -1;
                return x.isfavourite - y.isfavourite
            }
        });
        console.log(`InitialState`, InitialState);
        current_page = 1;
        changePage(current_page);
        setInitialState(InitialState);
        setSort(sorting);

    }

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6">
            <div className="flex justify-center p-4 px-3 py-10">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                        <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                            Friends List
                    </div>
                        <div className="flex items-center bg-gray-200 rounded-md">
                            <div className="pl-2">
                                <svg className="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path className="heroicon-ui"
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                            </div>
                            <input
                                className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                id="search" type="text" placeholder="Enter your friends name"
                                onChange={inputTextHandler} onKeyUp={addFriendHandler} />
                        </div>
                        <div className="pt-3 pl-3 text-sm">
                            <div className="flex-grow font-medium px-2">
                                <div className="text-lg cursor-pointer" onClick={() => sortHandler()}>Sort By favourites</div>
                            </div>
                        </div>
                        <div className="py-3 text-sm">
                            {
                                friends && friends.map((friend, index) => {
                                    return (
                                        <div key={friend.id} className="select-none flex flex-1 items-center px-2 py-4 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl p-6 hover:shadow-2xl">
                                            <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                                            <div className="flex-grow font-medium px-2">
                                                <div className="text-md">{friend.name}</div>
                                                <div className="text-sm text-gray-400">is your friend</div>
                                            </div>
                                            <div className="text-sm flex font-normal p-2 border-gray-400 tracking-wide">
                                                {friend.isfavourite &&
                                                    <img src={ActiveStar} alt="star" className="border-gray-400 px-2 cursor-pointer"
                                                        onClick={() => changeFavouriteHandler(friend.id)} />}
                                                {!friend.isfavourite &&
                                                    <img src={DeactivatedStar} alt="star" className="border-gray-400 px-2 cursor-pointer"
                                                        onClick={() => changeFavouriteHandler(friend.id)} />}

                                                <img src={Delete} alt="delete" className="border-gray-400 px-2 cursor-pointer hover:shadow-2xl"
                                                    onClick={() => deleteFriendHandler(friend.id)} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex justify-end">
                            <button className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg" onClick={prevPage}>
                                <span className="mx-1 flex items-center font-bold"
                                >Previous</span>
                            </button>
                            <button className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg" onClick={nextpage}>
                                <span className="flex items-center font-bold mx-1"
                                >Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FriendList;