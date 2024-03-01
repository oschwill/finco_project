--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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

--
-- Name: transaction_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transaction_type AS ENUM (
    'income',
    'expense'
);


ALTER TYPE public.transaction_type OWNER TO postgres;

--
-- Name: update_user_balance(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_user_balance() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Berechne das neue Gesamtkapital für den Benutzer der von der Transaktion betroffen ist
    UPDATE users
    SET total_capital = (
        SELECT SUM(
            CASE
                WHEN transaction_type = 'income' THEN amount
                WHEN transaction_type = 'expense' THEN -amount
                ELSE 0
            END
        )
        FROM transactions
        WHERE user_id = NEW.user_id
    )
    WHERE id = NEW.user_id;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_user_balance() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer,
    transaction_type public.transaction_type,
    amount money NOT NULL,
    category character varying(255) NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: TABLE transactions; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.transactions IS 'user transactions, income,outcome';


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(32) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    credit_card character varying(16) NOT NULL,
    image_profile_id character varying(255),
    image_profile_path character varying(255),
    total_capital money DEFAULT 10000 NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.users IS 'user table';


--
-- Name: users credit_card; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT credit_card UNIQUE (credit_card);


--
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- Name: users id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT id PRIMARY KEY (id) INCLUDE (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: transactions trigger_update_balance; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_balance AFTER INSERT OR DELETE OR UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_user_balance();


--
-- Name: transactions user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--