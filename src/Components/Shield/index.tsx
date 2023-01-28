import Head from "next/head";
import React, { useEffect } from "react";

import { PomoStateProvider } from "../../utils/Context/PomoContext/Context";
import reducer, { initialState } from "../../utils/Context/PomoContext/reducer";
import ureducer, {
  initialState as userInitial,
} from "../../utils/Context/UserContext/reducer";
import preducer, {
  initialState as projInitial,
} from "../../utils/Context/ProjectContext/reducer";
import { UserStateProvider } from "../../utils/Context/UserContext/Context";
import { ProjectStateProvider } from "../../utils/Context/ProjectContext/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Router from "next/router";
import NextProgress from "next-progress";

interface Props {
  children: JSX.Element | React.ReactNode;
}

export default function Shield({ children }: Props) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status != "loading") {
      Router.push("/login");
    }
  }, [session, status]);

  return (
    <ProjectStateProvider reducer={preducer} initialState={projInitial}>
      <UserStateProvider reducer={ureducer} initialState={userInitial}>
        <PomoStateProvider reducer={reducer} initialState={initialState}>
          <NextProgress color="#374151" options={{ showSpinner: false }} />

          <ToastContainer hideProgressBar newestOnTop={true} />

          <Head>
            <title>Pomodoro</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {children}
        </PomoStateProvider>
      </UserStateProvider>
    </ProjectStateProvider>
  );
}
