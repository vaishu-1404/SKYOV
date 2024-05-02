'use client';
import { Triangle } from "react-loader-spinner";

const Loader = () => {
    return (
        <div>
            <Triangle
                visible={true}
                height={100}
                width={100}
                color="#5DADE2"
                ariaLabel="triangle-loading"
                justify-content="center"
                align-items="center"
            />
        </div>
    );
}

export default Loader;
