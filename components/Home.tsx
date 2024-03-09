"use client";

import React from "react";
import { Album, Music } from "@/types";
import {
  Button,
  Checkbox,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

type Props = {
  albums: Album[];
};

export const Home = ({ albums }: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(albums.map((album) => album.id)),
  );

  const [selectedMusics, setSelectedMusics] = React.useState<Music[]>([]);

  const handleClick = () => {
    const selectedAlbums = albums.filter((v) =>
      [...selectedKeys].includes(v.id),
    );

    const musics = selectedAlbums.map((v) => v.musics.map((v2) => v2)).flat();

    const pickRandomSongs = ({
      musics,
      count,
    }: {
      musics: Music[];
      count: number;
    }) => {
      const shuffled = musics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const count = 5;
    const randomMusics = pickRandomSongs({
      musics,
      count,
    });

    onOpen();
    setSelectedMusics(randomMusics);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="p-4">
        <Table
          aria-label="THE+BETH ALBUMS"
          color="primary"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          checkboxesProps={{
            size: "sm",
            classNames: {
              base: "p-0 m-0",
              wrapper: "mr-0",
            },
          }}
          classNames={{
            td: "align-top",
          }}
        >
          <TableHeader>
            <TableColumn>ALBUMS</TableColumn>
          </TableHeader>
          <TableBody>
            {albums.map((album) => (
              <TableRow key={album.id}>
                <TableCell>
                  <div className="h-full flex font-bold text-base">
                    {album.title}
                  </div>
                  <ul className="flex flex-wrap gap-x-2">
                    {album.musics.map((music) => (
                      <li key={music.id} className="text-[12px] opacity-80">
                        #{music.title}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          color="primary"
          fullWidth
          size="lg"
          className="mt-8"
          onClick={handleClick}
        >
          <span className="font-bold" onClick={handleClick}>
            ランダムで5曲を選ぶ
          </span>
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        placement="center"
        size="xs"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>5 MUSICS</ModalHeader>
              <ModalBody>
                <div className="grid gap-2">
                  {/* <span>#THE+BETH</span> */}
                  {selectedMusics.map((v) => (
                    <span key={v.id}>#{v.title}</span>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} fullWidth>
                  <span className="font-bold">結果をポストする</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
