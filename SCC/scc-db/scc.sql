--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2022-02-07 10:22:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 32989)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid bigint NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2980 (class 0 OID 32989)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, firstname, lastname, password, role, username) FROM stdin;
1	Admin	User	password@123	Admin	sccadmin
2	ReadWrite	User	password@123	SCC_Read_Write	scc_rw_user
3	ViewOnly	User	password@123	SCC_View_Only	scc_vo_user
\.


--
-- TOC entry 2849 (class 2606 OID 32996)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


-- Completed on 2022-02-07 10:22:26

--
CREATE TABLE public.configuration_settings (
    field character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    username character varying(255),
    creation_time timestamp without time zone,
    modification_time timestamp without time zone   
);

ALTER TABLE public.configuration_settings OWNER TO postgres;

ALTER TABLE ONLY public.configuration_settings
    ADD CONSTRAINT configuration_settings_pkey PRIMARY KEY (field);
-- PostgreSQL database dump complete
--

