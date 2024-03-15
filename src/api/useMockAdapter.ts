import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// import authors from "src/data/authors";
// import {commentsPage1, commentsPage2, commentsPage3} from "src/data/comments";

const useMockAdapter = () => {
    const mock = new MockAdapter(axios, {delayResponse: 600});

    // // authors
    mock.onGet("/api/test").reply(200, {res: true});

    mock.onPost("/api/test-mut").reply((config) => {
        const data = JSON.parse(config.data)
        console.log(data);
        return [200, {res: 'entered'}]
    });

    // // comments
    // mock.onGet("/api/comments", {params: {page: 1}}).reply(200, commentsPage1);

    // mock.onGet("/api/comments", {params: {page: 2}}).networkErrorOnce();
    // mock.onGet("/api/comments", {params: {page: 2}}).reply(200, commentsPage2);

    // mock.onGet("/api/comments", {params: {page: 3}}).reply(200, commentsPage3);
};

export default useMockAdapter;