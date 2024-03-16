"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { type Album, type Music } from "@/types";

type Props = {
  albums: Album[];
};

export const Home = ({ albums }: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(albums.map((album) => album.id)),
  );

  const router = useRouter();
  const [selectedMusics, setSelectedMusics] = React.useState<Music[]>([]);
  const handleClick = () => {
    const selectedAlbums = albums.filter((v) =>
      [...selectedKeys].includes(v.id),
    );

    const musics = selectedAlbums.map((v) => v.musics.map((v2) => v2)).flat();

    const pickRandomMusics = ({
      musics,
      count,
    }: {
      musics: Music[];
      count: number;
    }) => {
      const shuffled = musics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const count = 3;
    const randomMusics = pickRandomMusics({
      musics,
      count,
    });

    onOpen();
    setSelectedMusics(randomMusics);

    const queryString = randomMusics
      .map((v, i) => `${i + 1}位 ${v.title}`)
      .join("\n");
    const encStr = encodeURIComponent(queryString);
    const url = `/?title=${encStr}`;
    router.push(url);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onPostButtonClick = () => {
    const url = location.href;
    const encStr = encodeURIComponent(url);
    window.location.href = `https://twitter.com/intent/post?url=${encStr}&text=今日のTHE+BETHMUSIC占い\n`;
    // hashタグは一旦外しておく
    // window.location.href = `https://twitter.com/intent/post?url=${encStr}&text=今日のTHE+BETHMUSIC占い\n&hashtags=THE+BETH,${selectedMusics
    //   .map((v) => v.title)
    //   .join(",")}\n`;
  };

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
            今日のTHE+BETH MUSICを占う
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
              <ModalHeader>今日のTHE+BETH MUSIC</ModalHeader>
              <ModalBody>
                <div className="grid gap-2">
                  {selectedMusics.map((v, i) => (
                    <div key={i}>{`${i + 1}位 ${v.title}`}</div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onPostButtonClick();
                    onClose();
                  }}
                  fullWidth
                >
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
