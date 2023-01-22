import { donate } from "../services"
import { useSigner } from "wagmi"
import { toast } from "react-hot-toast"
import React, { useRef, useState } from "react"
import {
    Box,
    Spinner,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
} from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

const Donate = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const [isDonating, setIsDonating] = useState(false)
    const [error, setError] = useState(false)

    const { isOpen, onClose, onOpen } = useDisclosure()
    const [ethToDonate, setEthToDonate] = useState(0)

    const handleDonate = async () => {
        try {
            setIsDonating(true)
            onClose()
            await donate(signer, ethToDonate)
            setIsDonating(false)
            toast.success(`Thanks for donating! ${ethToDonate}`, { duration: 5000 })
        } catch (err) {
            toast.error("Something Went Wrong!")
            setIsDonating(false)
            setError(true)
        }
    }
    if (!signer) {
        return null
    } else {
        return (
            <>
                <Button
                    isLoading={isDonating}
                    loadingText="Donating..."
                    colorScheme="blue"
                    onClick={onOpen}
                >
                    Donate ETH
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>PLW 3.0</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>How much you want to donate?</FormLabel>
                                <Input
                                    type="number"
                                    onChange={(e) => setEthToDonate(e.target.value)}
                                    placeholder="ETH"
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={handleDonate} colorScheme="blue" mr={3}>
                                Donate
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }
}

export default Donate
