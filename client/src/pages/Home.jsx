import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
} from '../config/motion';

const Home = () => {
    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img src="./threejs.png" alt="logo" className="w-8 h-8 object-contain"/>
                    </motion.header>
                    <motion.div className='home-container' {...headContainerAnimation}>
                        <motion.div className='head-text' {...headTextAnimation}>
                            <h1>
                                T-SHIRT <br className='xl:block hidden' /> 3D
                            </h1>
                        </motion.div>
                        <motion.div
                            {...headContentAnimation}
                            className='flex flex-col gap-5'
                        >
                            <p className='max-w-md font-normal text-gray-600 text-base'>
                                Créez votre t-shirt unique avec notre outil de personnalisation 3D.
                                <strong> Exprimez votre créativité </strong> et adoptez un style qui vous ressemble.
                            </p>
                            <CustomButton
                                type='filled'
                                title='Personnaliser'
                                handleClick={() => state.intro = false}
                                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

export default Home;
